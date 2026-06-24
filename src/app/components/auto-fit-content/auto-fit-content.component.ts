import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, Input, inject, NgZone } from '@angular/core';

@Component({
  selector: 'app-auto-fit-content',
  standalone: true,
  template: `
    <div #container class="auto-fit-container" style="flex: 1; min-height: 0; width: 100%; overflow: hidden; display: flex; flex-direction: column;">
      <div #inner class="auto-fit-inner" style="height: auto; width: 100%; display: block;">
        <ng-content></ng-content>
      </div>
    </div>
  `
})
export class AutoFitContentComponent implements AfterViewInit, OnDestroy {
  @Input() maxFontSize = 1;
  @Input() minFontSize = 0.45;
  @Input() step = 0.005;
  @Input() unit = 'rem';

  @ViewChild('container') containerRef!: ElementRef<HTMLDivElement>;
  @ViewChild('inner') innerRef!: ElementRef<HTMLDivElement>;

  private resizeObserver: ResizeObserver | null = null;
  private timeoutId: any;
  private ngZone = inject(NgZone);

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      this.resizeObserver = new ResizeObserver(() => this.fit());
      this.resizeObserver.observe(this.containerRef.nativeElement);
      
      // Delay slightly for initial layouts
      this.timeoutId = setTimeout(() => this.fit(), 1);
    });
  }

  ngOnDestroy() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  private fit() {
    const container = this.containerRef?.nativeElement;
    const inner = this.innerRef?.nativeElement;
    if (!container || !inner) return;

    const containerHeight = container.offsetHeight;
    if (containerHeight <= 0) {
      // Re-schedule for layout
      this.timeoutId = setTimeout(() => this.fit(), 10);
      return;
    }

    let currentSize = this.maxFontSize;
    inner.style.fontSize = `${currentSize}${this.unit}`;

    const maxIterations = 100;
    let iteration = 0;

    // Scale down if inner content height exceeds container height
    while (inner.scrollHeight > containerHeight + 1 && currentSize > this.minFontSize && iteration < maxIterations) {
      currentSize = Math.max(this.minFontSize, currentSize - this.step);
      inner.style.fontSize = `${currentSize}${this.unit}`;
      iteration++;
    }
  }
}
