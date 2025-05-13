import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent {
  searchTerm: string = '';
  
  constructor(private router: Router) {}
  
  onSubmit() {
    if (this.searchTerm.trim()) {
      this.router.navigate(['/espacos'], { queryParams: { search: this.searchTerm } });
    }
  }
}