import { ActivatedRoute } from "@angular/router";

private router

IMPORTADO ROUTER 
viewClassDetails(classId: string) {
    this.router.navigate(['/teacherclassdetail'], {
      queryParams: { classId: classId }
    });
  }


IMPORTADO ActivatedRoute

private route: ActivatedRoute
ngOnInit() {  
    this.route.queryParams.subscribe(params => {
      this.classId = params['classId'];
      if (this.classId) {
        this.fetchClassDetails(this.classId);
      }
    });
  }