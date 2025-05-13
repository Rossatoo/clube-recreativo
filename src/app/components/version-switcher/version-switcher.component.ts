import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-version-switcher',
  templateUrl: './version-switcher.component.html',
  styleUrls: ['./version-switcher.component.scss']
})
export class VersionSwitcherComponent {
  @Input() versions: string[] = [];
  @Input() defaultVersion: string = '';
  selectedVersion: string = '';
  
  ngOnInit() {
    this.selectedVersion = this.defaultVersion || (this.versions.length > 0 ? this.versions[0] : '');
  }
  
  onVersionChange(event: Event) {
    this.selectedVersion = (event.target as HTMLSelectElement).value;
  }
}