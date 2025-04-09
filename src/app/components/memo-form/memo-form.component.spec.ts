import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoFormComponent } from './memo-form.component';

describe('MemoFormComponent', () => {
  let component: MemoFormComponent;
  let fixture: ComponentFixture<MemoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemoFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
