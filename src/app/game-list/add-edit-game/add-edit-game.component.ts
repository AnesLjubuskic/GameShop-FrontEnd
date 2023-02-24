
import { HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from 'src/app/login/auth.service';
import { GameService } from '../game.service';

@Component({
  selector: 'app-add-edit-game',
  templateUrl: './add-edit-game.component.html',
  styleUrls: ['./add-edit-game.component.css']
})
export class AddEditGameComponent implements OnInit {

  @Input() open: boolean = false;
  @Output() close = new EventEmitter<boolean>();
  @Input() editGame: any;
  editMode: boolean = false;
  @Input() category: any[];
  @Input() subcategory: any[];
  frmGame: FormGroup;

  constructor(private gameService: GameService, private authService: AuthService) { }

  ngOnInit(): void {
    this.editGame.releaseDate = (new Date()).toISOString().substring(0, 10);
    this.frmGame = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'price': new FormControl(null,
        [Validators.required,
        Validators.pattern("^[1-9]+[0-9]*$")]),
      'description': new FormControl(null, Validators.required),
      'releaseDate': new FormControl(new FormControl((new Date()).toISOString().substring(0, 10))),
      'imageURL': new FormControl(null, Validators.required),
      'quantity': new FormControl(null,
        [Validators.required,
        Validators.pattern("^[1-9]+[0-9]*$")]),
      'editMode': new FormControl(),
      'platform': new FormControl(),
      'categoryId': new FormControl(),
      'subCategoryId': new FormControl()
    });
    if (this.editGame.editMode) {
      this.editMode = true;
    } else this.editMode = false;
  }

  /* @HostListener('window:beforeunload', ['$event'])
   ngOnDestroy() {
     const headers = new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization': 'bearer ' + this.authService.user.jwt
     }) || null;
     this.editGame.editMode = false;
     this.gameService.putGames(this.editGame, headers);
   }*/

  addEditGame() {
    if (this.authService.user == undefined) {
      alert("Not Logged!")
      return;
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + this.authService.user.jwt
    }) || null;
    if (this.editGame.editMode) {
      this.editMode = true;
    } else this.editMode = false;
    this.frmGame.value.editMode = false;
    this.frmGame.value.categoryId = Number(this.frmGame.value.categoryId);
    this.frmGame.value.subCategoryId = Number(this.frmGame.value.subCategoryId);
    this.frmGame.value.platform = Number(this.frmGame.value.platform);
    if (!this.editMode) {
      this.gameService.postGames(this.frmGame.value, headers)
        .subscribe((x: any) => {
          this.open = false;
          console.log(x);

        });
    }
    else {
      this.frmGame.value.id = this.editGame.id;
      this.gameService.putGames(this.frmGame.value, headers)
        .subscribe(() => { }, () => { this.frmGame.value.editMode = true; })
    }
    this.closeModal();
  }

  closeModal() {
    this.open = false;
    this.close.emit();
    this.gameService.addEditEvent$.next(true);
  }
}
