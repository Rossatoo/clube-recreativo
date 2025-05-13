import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VersionSwitcherComponent } from './version-switcher.component';

describe('VersionSwitcherComponent', () => {
  let component: VersionSwitcherComponent;
  let fixture: ComponentFixture<VersionSwitcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VersionSwitcherComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VersionSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
