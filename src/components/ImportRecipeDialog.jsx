import React, { useState, useEffect, useRef } from 'react';
import { decodeRecipe, extractRecipeMeta } from '../utils/recipeCodec';
import { getAssetUrl } from '../data/artworkData';
import 'mdui/components/dialog.js';
import 'mdui/components/button.js';
import 'mdui/components/button-icon.js';
import 'mdui/components/icon.js';

export const ImportRecipeDialog = ({ open, onClose, onImport }) => {
    const dialogRef = useRef(null);
    const [rawInput, setRawInput] = useState('');
    const [preview, setPreview] = useState(null);
    const [error, setError] = useState(null);
    const [isDecoding, setIsDecoding] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (dialogRef.current) {
            dialogRef.current.open = open;
        }
        if (open) {
            setRawInput('');
            setPreview(null);
            setError(null);
            setIsSubmitting(false);
        }
    }, [open]);

    // Live validation and preview
    useEffect(() => {
        const trimmed = rawInput.trim();
        if (!trimmed) {
            setPreview(null);
            setError(null);
            return;
        }

        let isCancelled = false;
        setIsDecoding(true);
        setError(null);

        const timer = setTimeout(async () => {
            try {
                const recipe = await decodeRecipe(trimmed);
                if (isCancelled) return;

                const meta = extractRecipeMeta(recipe);
                setPreview({
                    recipe,
                    name: meta.name,
                    level: meta.level,
                    image: meta.image,
                    slotsCount: recipe.slots?.length || 0,
                    inputsCount: recipe.inputs?.length || 0
                });
                setError(null);
            } catch (err) {
                if (isCancelled) return;
                setPreview(null);
                setError(err.message || 'Invalid encoded recipe string');
            } finally {
                if (!isCancelled) setIsDecoding(false);
            }
        }, 150);

        return () => {
            isCancelled = true;
            clearTimeout(timer);
        };
    }, [rawInput]);

    const handlePasteClipboard = async () => {
        try {
            if (navigator?.clipboard?.readText) {
                const text = await navigator.clipboard.readText();
                if (text) {
                    setRawInput(text);
                }
            }
        } catch (e) {
            console.error('Could not read clipboard', e);
        }
    };

    const handleImportClick = async () => {
        if (!preview?.recipe && !rawInput.trim()) return;
        setIsSubmitting(true);
        try {
            await onImport(rawInput.trim());
            onClose();
        } catch (err) {
            setError(err.message || 'Failed to import character');
            setIsSubmitting(false);
        }
    };

    const heroImage = preview?.image ? getAssetUrl(preview.image) : null;
    const initials = preview?.name
        ? preview.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
        : '?';

    return (
        <mdui-dialog
            ref={dialogRef}
            className="recipe-dialog import-recipe-dialog"
            headline="Import Character Recipe"
            onClosed={onClose}
        >
            <div className="recipe-dialog__content">
                <p className="recipe-dialog__desc">
                    Paste an encoded alphanumeric character string to import and build the character.
                </p>

                {/* Input Area */}
                <div className="recipe-input-group">
                    <div className="recipe-input-group__header">
                        <label className="recipe-input-group__label">
                            Character Code
                        </label>
                        <button
                            type="button"
                            className="recipe-paste-btn"
                            onClick={handlePasteClipboard}
                        >
                            <mdui-icon name="content_paste" style={{ fontSize: '0.9rem', marginRight: '4px' }}></mdui-icon>
                            Paste from Clipboard
                        </button>
                    </div>

                    <textarea
                        value={rawInput}
                        onChange={(e) => setRawInput(e.target.value)}
                        placeholder="Paste alphanumeric string here (e.g. 9itHd4AiInF...)"
                        rows={4}
                        className="recipe-code-box__textarea recipe-code-box__textarea--input"
                        spellCheck={false}
                        autoFocus
                    />
                </div>

                {/* Status / Live Preview */}
                {isDecoding && (
                    <div className="recipe-status-pill recipe-status-pill--loading">
                        Decoding character recipe...
                    </div>
                )}

                {error && !isDecoding && (
                    <div className="recipe-status-pill recipe-status-pill--error">
                        <mdui-icon name="error_outline" style={{ fontSize: '1rem', marginRight: '6px' }}></mdui-icon>
                        {error}
                    </div>
                )}

                {preview && !isDecoding && (
                    <div className="recipe-preview-card">
                        <div className="recipe-preview-card__badge">
                            <mdui-icon name="check_circle" style={{ fontSize: '0.85rem', marginRight: '4px' }}></mdui-icon>
                            Valid Recipe Found
                        </div>
                        <div className="recipe-preview-card__body">
                            <div className="recipe-dialog__avatar">
                                {heroImage ? (
                                    <img src={heroImage} alt={preview.name} />
                                ) : (
                                    <div className="recipe-dialog__avatar-fallback">{initials}</div>
                                )}
                            </div>
                            <div className="recipe-preview-card__info">
                                <h4 className="recipe-preview-card__name">{preview.name}</h4>
                                <p className="recipe-preview-card__meta">
                                    Level {preview.level} • {preview.slotsCount} slots filled
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <mdui-button slot="action" variant="text" onClick={onClose} disabled={isSubmitting ? true : undefined}>
                Cancel
            </mdui-button>
            <mdui-button
                slot="action"
                variant="filled"
                icon="file_download"
                onClick={handleImportClick}
                disabled={!preview || isSubmitting ? true : undefined}
            >
                {isSubmitting ? 'Importing...' : 'Import'}
            </mdui-button>
        </mdui-dialog>
    );
};
