import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { combineLatestWith, map } from 'rxjs';

import { USER_ID } from '../../contact-manager.routes';
import { UserService } from '../../services/user.service';
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
  private readonly userService = inject(UserService);
  private readonly userId$ = this.activatedRoute.params.pipe(
    map((params) => {
      const id = +params[USER_ID];
      return isNaN(id) ? 0 : id;
    }),
  );
  readonly user$ = this.userId$.pipe(
    combineLatestWith(this.userService.data$),
    map(([userId, users]) => {
      return userId === 0 ? null : users.find((u) => u.id === userId) ?? null;
    }),
  );
}
