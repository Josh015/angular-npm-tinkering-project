import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ContactManagerService } from './contact-manager.service';

@Component({
  selector: 'app-contact-manager-app',
  template: '<app-sidenav />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [SidenavComponent],
})
export class ContactManagerComponent implements OnInit {
  private readonly iconRegistry = inject(MatIconRegistry);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly contactManagerService = inject(ContactManagerService);

  async ngOnInit(): Promise<void> {
    this.iconRegistry.addSvgIconSet(
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/avatars.svg'),
    );

    await this.contactManagerService.fetchUsers();
  }
}
