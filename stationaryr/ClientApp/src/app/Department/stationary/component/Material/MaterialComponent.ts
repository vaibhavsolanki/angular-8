import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ComponentService } from '../../../../services/ComponentService';
import { Material } from '../../../../TableEntity/TableEntityClass';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
    selector: 'app-material',
    templateUrl: './Material.html',
})

export class MaterialComponent implements OnInit {
    MaterialForm: FormGroup;
    submitted = false;
    loading = false;
    Material: string;
    material: Material;
    materials: Material[];
  btnvisibility: boolean = true;
  @Input() link1: string;
  routelink: string;
  editroutelink: string;
  getstatus: string;
    constructor(private formbuilder: FormBuilder, private Componentservices: ComponentService, private router: Router) {

    }
    Type: Type[] = [
        { value: 'Stationary', text: 'Stationary' },
        { value: 'Print', text: 'Print' },
       
    ];
  ngOnInit() {

    if (this.link1 == undefined) {
      this.routelink = "GetMaterial";
      this.editroutelink = "stationary/GetMaterial";
      this.getstatus = "1";
      
    }

    else {
      this.Type = [];
      this.Type.push({ value:'IT',text:'IT' });
      this.routelink = this.link1;
      this.editroutelink = "IT/" + this.link1
      this.getstatus = "2";
    }
        this.MaterialForm = this.formbuilder.group({
           
            ITEMS_DESCRIPTION: ['', Validators.required],
            
            TYPE: ['', Validators.required]
        })
        let empid = localStorage.getItem('editmaterialId');

        if (+empid > 0) {
            this.Componentservices.getmaterialId(+empid).subscribe(data => {
                this.materials = data,
                    console.log(this.materials),
                    this.MaterialForm.controls['ITEMS_DESCRIPTION'].setValue(this.materials[0].ITEMS_DESCRIPTION);
                this.MaterialForm.controls['TYPE'].setValue(this.materials[0].TYPE);
                //this.MaterialForm.controls['ID'].setValue(this.materials[0].ID);
            })

            this.btnvisibility = false;
        }
    }
    get f() { return this.MaterialForm.controls; }

    onSubmit() {
        this.submitted = true;

        if (this.MaterialForm.invalid) {
            return;
        }
        this.loading = true;
      this.Componentservices
        .SaveMaterial(this.MaterialForm.value, this.getstatus)
          .subscribe(data => { this.Material = data, alert(this.Material), this.loading = false; console.log(this.Material); this.router.navigate([this.editroutelink]); },
                error => () => {

                },
                () => console.log(this.Material)
            );

    }
    onUpdate() {
        this.submitted = true;

        if (this.MaterialForm.invalid) {
            return;
        }
        this.loading = true;
        this.Componentservices
            .UpdateMaterial(this.MaterialForm.value)
          .subscribe(data => { this.Material = data, alert(this.Material), this.loading = false; console.log(this.Material); this.router.navigate([this.editroutelink]); },
                error => () => {

                },
                () => console.log(this.Material)
            );
    }
}

export interface Type {
    value: string;
    text: string;
}


