import { Component, OnInit} from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  constructor() { }

  ngOnInit(): void {
    $(document).ready(() => {
      $('.dropdown-toggle').dropdown();

      $('#categories').on('click', (event: MouseEvent) => {
        event.stopPropagation();
        $('.dropdown-menu').show();
      });

      $(document).on('click', (event: MouseEvent) => {
        const $trigger = $('#categories');
        const $dropdown = $('.dropdown-menu');

        if (!$trigger.is(event.target) && !$dropdown.is(event.target) && $dropdown.has(event.target).length === 0) {
          $dropdown.hide();
        }
      });
    });
  }
}
