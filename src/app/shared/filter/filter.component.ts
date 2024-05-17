import {Component, EventEmitter, input, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'as-filter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.sass'
})
export class FilterComponent {

  role = input.required<string>({alias: 'roleInput'});
  type = input.required<string>();
  placeholder = input.required<string>();
  @Output() text = new EventEmitter<string>();

  filter(text: any): void {
    this.text.emit(text.target.value);
  }

}
