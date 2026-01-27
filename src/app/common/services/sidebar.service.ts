import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  constructor(private http: HttpClient) { }

  getTreeSideBarTreeList(){
    let bodyObj = {
      site: "site"
    }

    return this.http.post(`http://localhost:3010/organizationTree/list`,bodyObj).pipe(map((resp: any) => {
      console.log('nnnmm',resp)
      return resp.data
    }))
  }

  addNode(node: any){
    console.log('bnbn',node)
    let nodeObj = {
        name: node.name,
        type: node.type,
        parent_id: node.parent_id,
        parentId: "",
        sort_order: 0,
        metadata: {},
    }
    return this.http.post(`http://localhost:3010/organizationTree/create`,nodeObj).pipe(map((resp:any) => {
        console.log('ress for create node::',resp)
        return resp
    }))
  }
}
