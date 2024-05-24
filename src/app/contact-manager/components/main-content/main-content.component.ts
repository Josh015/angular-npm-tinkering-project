import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { combineLatestWith, map } from 'rxjs';

import { ContactManagerService } from '../../contact-manager.service';
import { NotesComponent } from '../notes/notes.component';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [AsyncPipe, MaterialModule, NotesComponent, TranslateModule],
})
export class MainContentComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly contactManagerService = inject(ContactManagerService);
  private readonly userId$ = this.activatedRoute.params.pipe(
    map((params) => {
      const id = +params['userId'];
      return isNaN(id) ? 0 : id;
    }),
  );
  readonly user$ = this.userId$.pipe(
    combineLatestWith(this.contactManagerService.users$),
    map(([userId, users]) => {
      return userId === 0 ? null : users.find((u) => u.id === userId) ?? null;
    }),
  );
}
