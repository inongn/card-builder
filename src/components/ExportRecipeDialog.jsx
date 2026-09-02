import React, { useState, useEffect, useRef } from 'react';
import { encodeRecipe } from '../utils/recipeCodec';
import { getAssetUrl } from '../data/artworkData';
import 'mdui/components/dialog.js';
import 'mdui/components/button.js';
import 'mdui/components/button-icon.js';
import 'mdui/components/icon.js';

export const ExportRecipeDialog = ({ open, onClose, character, recipe }) => {
    const dialogRef = useRef(null);
    const [encodedCode, setEncodedCode] = useState('');
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState(null);

    const charRecipe = recipe || character?.recipe;
    const charName = character?.name || character?.meta?.name || 'Character';
    const charClass = character?.class || character?.meta?.class || '';
    const charSub = character?.sub || character?.meta?.sub || '';
    const charLevel = character?.level || character?.meta?.level || 1;
    const charImage = character?.image || character?.meta?.image;
    const heroImage = charImage ? getAssetUrl(charImage) : null;

    useEffect(() => {
        if (dialogRef.current) {
            dialogRef.current.open = open;
        }
    }, [open]);

    useEffect(() => {
        if (!open || !charRecipe) return;

        let isCancelled = false;

        encodeRecipe(charRecipe)
            .then(code => {
                if (!isCancelled) {
                    setEncodedCode(code);
                }
            })
            .catch(err => {
                if (!isCancelled) {
                    setError(err.message || 'Failed to encode recipe');
                }
            });

        return () => {
            isCancelled = true;
        };
    }, [open, charRecipe]);

    const handleDialogClosed = () => {
        setEncodedCode('');
        setError(null);
        setCopied(false);
        onClose?.();
    };

    const isLoading = open && !encodedCode && !error;

    const handleCopy = async () => {
        if (!encodedCode) return;
        try {
            if (navigator?.clipboard?.writeText) {
                await navigator.clipboard.writeText(encodedCode);
            } else {
                const textarea = document.createElement('textarea');
                textarea.value = encodedCode;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
            }
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        } catch (e) {
            console.error('Failed to copy to clipboard', e);
        }
    };

    const handleSelectAll = (e) => {
        e.target.select();
    };

    const initials = charName
        ? charName.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
        : 'C';

    return (
        <mdui-dialog
            ref={dialogRef}
            className="recipe-dialog export-recipe-dialog"
            headline="Export Character Recipe"
            onClosed={handleDialogClosed}
        >
            <div className="recipe-dialog__content">
                {/* Character Header Preview */}
                <div className="recipe-dialog__hero">
                    <div className="recipe-dialog__avatar">
                        {heroImage ? (
                            <img src={heroImage} alt={charName} />
                        ) : (
                            <div className="recipe-dialog__avatar-fallback">{initials}</div>
                        )}
                    </div>
                    <div className="recipe-dialog__details">
                        <h3 className="recipe-dialog__title">{charName}</h3>
                        <p className="recipe-dialog__subtitle">
                            Level {charLevel} {[charSub, charClass].filter(Boolean).join(' ')}
                        </p>
                    </div>
                </div>

                <p className="recipe-dialog__desc">
                    This compact alphanumeric code contains all choices, abilities, and items for this character.
                    You can share it anywhere or import it on any device.
                </p>

                {/* Code Display Area */}
                <div className="recipe-code-box">
                    <div className="recipe-code-box__header">
                        <span className="recipe-code-box__label">
                            <mdui-icon name="qr_code_2" style={{ fontSize: '1rem', marginRight: '4px', verticalAlign: 'middle' }}></mdui-icon>
                            Alphanumeric Code
                        </span>
                        {encodedCode && (
                            <span className="recipe-code-box__badge">
                                {encodedCode.length} chars • Base62
                            </span>
                        )}
                    </div>

                    {isLoading ? (
                        <div className="recipe-code-box__loading">
                            Generating encoded string...
                        </div>
                    ) : error ? (
                        <div className="recipe-code-box__error">{error}</div>
                    ) : (
                        <textarea
                            readOnly
                            value={encodedCode}
                            onClick={handleSelectAll}
                            className="recipe-code-box__textarea"
                            rows={5}
                            spellCheck={false}
                        />
                    )}
                </div>
            </div>

            <mdui-button slot="action" variant="text" onClick={onClose}>
                Close
            </mdui-button>
            <mdui-button
                slot="action"
                variant="filled"
                icon={copied ? "check" : "content_copy"}
                onClick={handleCopy}
                disabled={isLoading || !encodedCode ? true : undefined}
                className={copied ? "btn-success" : ""}
            >
                {copied ? 'Copied!' : 'Copy Code'}
            </mdui-button>
        </mdui-dialog>
    );
};
