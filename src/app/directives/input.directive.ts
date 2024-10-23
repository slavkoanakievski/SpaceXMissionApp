import { Directive, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { debounceTime, filter, fromEvent, map, Subscription, tap } from 'rxjs';



export interface InputConfig {
  debounceTime: number;
  minKeyStrokes: number;
}

@Directive({
  selector: '[sxmInput]'
})
export class InputDirective implements OnInit, OnDestroy {
  @Input() inputConfig: InputConfig = {
    debounceTime: 250,
    minKeyStrokes: 0,
  };
  @Output() inputValue = new EventEmitter<string | number>();
  private _subscription: Subscription;

  constructor(private el: ElementRef<HTMLInputElement>) { }
  ngOnInit(): void {
    if (
      !(
        this.el.nativeElement instanceof HTMLInputElement)
    ) {
      throw new Error('The inputElement is not an <input> or <textarea>');
    }

    this._subscription = fromEvent(this.el.nativeElement, 'input')
      .pipe(
        map((e: Event) => (e.target as HTMLInputElement).value),
        filter(
          inputValue => inputValue.length >= this.inputConfig.minKeyStrokes || !inputValue.length
        ),
        debounceTime(this.inputConfig.debounceTime),
        tap(inputValue => {
          this.inputValue.emit(inputValue);
        })
      )
      .subscribe();
  }


  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

}
