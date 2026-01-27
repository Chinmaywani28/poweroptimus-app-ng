import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as echarts from 'echarts';
import { SidebarService } from '../../common/services/sidebar.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    standalone: true,
    selector: 'app-tree-nodes',
    imports: [CommonModule, FormsModule],
    templateUrl: './tree-nodes.component.html',
    styleUrl: './tree-nodes.component.css',
})
export class TreeNodesComponent {
    @Input() node: any; // ONE node only
    expanded = false; // local expand state
    showAddInput = false;     // controls input visibility
    newNodeName = '';        // holds typed value
    @Output() nodeSelected  = new EventEmitter<any>();


    constructor(private sidebarService: SidebarService, private snackBar: MatSnackBar){}

    toggle(): void {
        this.expanded = !this.expanded;
    }

    getIcon(type: string): string {
        switch (type) {
            // case 'country':
            //     return '🌍';
            // case 'city':
            //     return '🏙️';
            // case 'facility':
            //     return '🏢';
            // case 'building':
            //     return '🏗️';
            // case 'floor':
            //     return '🧱';
            // case 'location':
            //     return '📍';
            // case 'sensor':
            //     return '📡';
            default:
                return '📁';
        }
    }

    onSelect(node: any): void {
        console.log('nodeSelected:', this.node);
        
        this.nodeSelected .emit(node)
            
    }


        // when CHILD node is clicked (bubble up)
    onChildSelected(node: any): void {
        this.nodeSelected.emit(node);
    }

    addChild(node: any): void {
        // console.log('Add under:', node);
        this.showAddInput = true;
        this.sidebarService.addNode(node)
    }

    editNode(node: any): void {
        console.log('Edit:', node.name);
    }

    deleteNode(node: any): void {
        console.log('Delete:', node.name);
    }

    // save new child
    saveChild(node: any): void {

        console.log('node addd::',node)
        if (!this.newNodeName.trim()) return;

        // const nodeType = node.children.length ? node.children[0].type : 'Failed to pass type'

             let typeHierarchy: Record<string, string> = {
                 country: 'city',
                 city: 'facility',
                 facility: 'building',
                 building: 'floor',
                 floor: 'location',
                 location: 'sensor',
             };

        const newChild = {
            id: Date.now(), // TEMP (backend will replace)
            name: this.newNodeName,
            type: typeHierarchy[node.type], // TEMP (later choose dynamically)
            level: node.level + 1,
            parent_id: node.id,
            children: [],
        };

        console.log('neeeww::',newChild)
        this.sidebarService.addNode(newChild).subscribe((resp: any) => {

              this.sidebarService.getTreeSideBarTreeList()
            
        } )

        // console.log('nb,bn::',newChild)

        // // add child locally (UI update)
        // node.children = node.children || [];
        
        // node.children.push(newChild);

        // console.log('added node::',node)

        // reset UI
        this.newNodeName = '';
        this.showAddInput = false;
        this.expanded = true;
        //   this.snackBar.open('', 'Close', {
        //       duration: 3000,
        //   });

          this.snackBar.open('Added successfully!', 'Close', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
          });

        // later:
        // call backend API with parent_id = node.id
    }
}
