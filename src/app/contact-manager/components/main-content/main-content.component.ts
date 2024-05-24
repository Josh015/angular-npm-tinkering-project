import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { USER_ID } from '../../contact-manager.routes';
import { UserService } from '../../services/user.service';
import { NotesComponent } from '../notes/notes.component';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MaterialModule, NotesComponent, TranslateModule],
})
export class MainContentComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly userService = inject(UserService);
  private readonly params = toSignal(this.activatedRoute.params);

  protected readonly user = computed(() => {
    const params = this.params();
    const userId = !params ? 0 : +params[USER_ID];

    return this.userService.data().find((u) => u.id === userId);
  });
}
