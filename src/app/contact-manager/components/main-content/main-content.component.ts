import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';

import { USER_ID_PARAM } from '../../models';
import { UserService } from '../../services/user.service';
import { NotesComponent } from '../notes/notes.component';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatTabsModule,
    NotesComponent,
    TranslocoDirective
  ]
})
export class MainContentComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly userService = inject(UserService);
  private readonly params = toSignal(this.activatedRoute.params);

  protected readonly user = computed(() => {
    const params = this.params();
    const userId = !params ? 0 : +params[USER_ID_PARAM];
    const users = this.userService.data();
    const user = users.find((u) => u.id === userId);

    return user;
  });
}
