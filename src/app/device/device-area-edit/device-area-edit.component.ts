 
  import { Component, OnInit } from '@angular/core';
  import { FormBuilder, Validators, FormGroup } from "@angular/forms";
  import { ActivatedRoute, Router } from "@angular/router";
  import { RequestService } from "src/app/request.service";
  import { NzMessageService } from "ng-zorro-antd/message";
  import { isIncludeAdmin } from "src/app/base/public"; 
  @Component({
    selector: 'app-device-area-edit',
    templateUrl: './device-area-edit.component.html',
    styleUrls: ['./device-area-edit.component.scss'],
  })
  export class DeviceAreaEditComponent implements OnInit {
    group!: FormGroup;
    id: any = 0
    url='/app/classify/api/';
    constructor(private fb: FormBuilder,
      private router: Router,
      private route: ActivatedRoute,
      private rs: RequestService,
      private msg: NzMessageService) {
    }
  
  
    ngOnInit(): void {
      if (this.route.snapshot.paramMap.has("id")) {
        this.id = this.route.snapshot.paramMap.get("id");
        this.rs.get(this.url+`device/area/${this.id}`).subscribe(res => {
          //let data = res.data;
          this.build(res.data)
        })
  
      }
  
      this.build()
    }
  
    build(obj?: any) {
      obj = obj || {}
      this.group = this.fb.group({ 
        id: [obj.id || '' ,[]], 
        name: [obj.name || '' ,[]], 
        desc: [obj.desc || '', []],  
      })
    }
  
    submit() {
  
      if (this.group.valid) {
  
        let url =this.url+( this.id ? `device/area/${this.id}` : `device/area/create`); 
        // this.group.patchValue({id: Number(this.group.value.id)  })
        this.rs.post(url, this.group.value).subscribe(res => {  
          this.router.navigateByUrl('area')
          this.msg.success("保存成功")
        })
  
        return;
      }
      else {
        Object.values(this.group.controls).forEach(control => {
          if (control.invalid) {
            control.markAsDirty();
            control.updateValueAndValidity({ onlySelf: true });
          }
        });
  
      }
    }
    handleCancel() {
      
      this.router.navigateByUrl('area');
    }
  
  }
  
