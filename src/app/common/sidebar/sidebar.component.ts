import { Component } from '@angular/core';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { ToggleService } from './toggle.service';
import { CommonModule, NgClass } from '@angular/common';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { WidgetService } from '../services/widget.service';
import { TreeNodesComponent } from "../../compoents-home/tree-nodes/tree-nodes.component";
import { SidebarService } from '../services/sidebar.service';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [
        NgScrollbarModule,
        MatExpansionModule,
        RouterLinkActive,
        RouterModule,
        RouterLink,
        NgClass,
        CommonModule,
        TreeNodesComponent,
    ],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
    // isSidebarToggled
    isSidebarToggled = false;

    // isToggled
    isToggled = false;

    constructor(
        private toggleService: ToggleService,
        public themeService: CustomizerSettingsService,
        private widgetService: WidgetService,
        private sidebarService: SidebarService,
    ) {
        this.toggleService.isSidebarToggled$.subscribe((isSidebarToggled) => {
            this.isSidebarToggled = isSidebarToggled;
        });
        this.themeService.isToggled$.subscribe((isToggled) => {
            this.isToggled = isToggled;
        });
    }

    // Burger Menu Toggle
    toggle() {
        this.toggleService.toggle();
    }

    // Mat Expansion
    panelOpenState = false;

    // Dark Mode
    toggleTheme() {
        this.themeService.toggleTheme();
    }

    // Sidebar Dark
    toggleSidebarTheme() {
        this.themeService.toggleSidebarTheme();
    }

    // Right Sidebar
    toggleRightSidebarTheme() {
        this.themeService.toggleRightSidebarTheme();
    }

    // Hide Sidebar
    toggleHideSidebarTheme() {
        this.themeService.toggleHideSidebarTheme();
    }

    // Header Dark Mode
    toggleHeaderTheme() {
        this.themeService.toggleHeaderTheme();
    }

    // Card Border
    toggleCardBorderTheme() {
        this.themeService.toggleCardBorderTheme();
    }

    // RTL Mode
    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }

    // siteData = {
    //     "Country": "India",
    //     "city": "Bengaluru",
    //     "Name": "SEZ",
    //     "Facilities": [
    //         {
    //             "Name": "Admin",
    //             "Floors": [
    //                 {
    //                     "Floor_Number": "Basement",
    //                     "Location": [
    //                         {
    //                             "Name": "xyz"
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     "Floor_Number": "Ground floor",
    //                     "Location": [
    //                        {
    //                             "Name": "xyz"
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     "Floor_Number": "First floor",
    //                     "Location": [
    //                        {
    //                             "Name": "xyz"
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     "Floor_Number": "Second floor",
    //                     "Location": [
    //                        {
    //                             "Name": "xyz"
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     "Floor_Number": "Third floor",
    //                     "Location": [
    //                        {
    //                             "Name": "xyz"
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     "Floor_Number": "Forth floor",
    //                     "Location": [
    //                        {
    //                             "Name": "xyz"
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     "Floor_Number": "Fifth floor",
    //                     "Location": [
    //                        {
    //                             "Name": "xyz"
    //                         }
    //                     ]
    //                 }

    //             ]
    //         },
    //         {
    //             "Name": "Operations",
    //             "Floors": [
    //                 {
    //                     "Floor_Number": "Basement",
    //                     "Location": [
    //                         {
    //                             "Name": "xyz"
    //                         }

    //                     ]

    //                 },
    //                 {
    //                     "Floor_Number": "Ground Floor",
    //                     "Location": [
    //                        {
    //                             "Name": "xyz"
    //                         }
    //                     ]

    //                 },
    //                 {
    //                     "Floor_Number": "First Floor",
    //                     "Location": [
    //                        {
    //                             "Name": "xyz"
    //                         }
    //                     ]

    //                 },
    //                 {
    //                     "Floor_Number": "Second Floor",
    //                     "Location": [
    //                        {
    //                             "Name": ""
    //                         }
    //                     ]

    //                 },
    //                 {
    //                     "Floor_Number": "Third Floor",
    //                     "Location": [
    //                        {
    //                             "Name": "xyz"
    //                         }
    //                     ]

    //                 },
    //                 {
    //                     "Floor_Number": "Forth Floor",
    //                     "Location": [
    //                        {
    //                             "Name": "xyz"
    //                         }
    //                     ]

    //                 },
    //                 {
    //                     "Floor_Number": "Fifth Floor",
    //                     "Location": [
    //                        {
    //                             "Name": "xyz"
    //                         }
    //                     ]

    //                 },
    //                 {
    //                     "Floor_Number": "Sixth Floor",
    //                     "Location": [
    //                        {
    //                             "Name": "xyz"
    //                         }
    //                     ]

    //                 },
    //                 {
    //                     "Floor_Number": "Seven Floor",
    //                     "Location": [
    //                        {
    //                             "Name": "xyz"
    //                         }
    //                     ]

    //                 },
    //                 {
    //                     "Floor_Number": "Eight Floor",
    //                     "Location": [
    //                        {
    //                             "Name": "xyz"
    //                         }
    //                     ]

    //                 },
    //                 {
    //                     "Floor_Number": "Nineth Floor",
    //                     "Location": [
    //                        {
    //                             "Name": "xyz"
    //                         }
    //                     ]

    //                 },
    //                 {
    //                     "Floor_Number": "Tenth Floor",
    //                     "Location": [
    //                        {
    //                             "Name": "xyz"
    //                         }
    //                     ]

    //                 }
    //             ]
    //         }

    //     ]
    // }

    siteData = {
        Name: 'SEZ',

        Country: 'India',

        City: [
            {
                Name: 'Pune',
                Facilities: [
                    {
                        Name: 'Admin',
                        Floors: [
                            {
                                Floor_Number: 'Parking',
                                Location: [
                                    {
                                        Name: 'Admin parking',
                                    },
                                ],
                            },
                            {
                                Floor_Number: 'Ground floor',
                                Location: [
                                    {
                                        Name: 'Cafeteria',
                                    },
                                ],
                            },
                            {
                                Floor_Number: 'First floor',
                                Location: [
                                    {
                                        Name: 'seminar hall',
                                    },
                                ],
                            },
                            {
                                Floor_Number: 'Second floor',
                                Location: [
                                    {
                                        Name: 'Meetingroom',
                                    },
                                ],
                            },
                            {
                                Floor_Number: 'Third floor',
                                Location: [
                                    {
                                        Name: 'F3',
                                    },
                                ],
                            },
                            {
                                Floor_Number: 'Forth floor',
                                Location: [
                                    {
                                        Name: 'F4',
                                    },
                                ],
                            },
                            {
                                Floor_Number: 'Fifth floor',
                                Location: [
                                    {
                                        Name: 'F5',
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        Name: 'Operations',
                        Floors: [
                            {
                                Floor_Number: 'Basement',
                                Location: [
                                    {
                                        Name: 'B1',
                                    },
                                ],
                            },
                            {
                                Floor_Number: 'Ground Floor',
                                Location: [
                                    {
                                        Name: 'GF',
                                    },
                                ],
                            },
                            {
                                Floor_Number: 'First Floor',
                                Location: [
                                    {
                                        Name: '1F',
                                    },
                                ],
                            },
                            {
                                Floor_Number: 'Second Floor',
                                Location: [
                                    {
                                        Name: '2F',
                                    },
                                ],
                            },
                            {
                                Floor_Number: 'Third Floor',
                                Location: [
                                    {
                                        Name: '3F',
                                    },
                                ],
                            },
                            {
                                Floor_Number: 'Forth Floor',
                                Location: [
                                    {
                                        Name: '4F',
                                    },
                                ],
                            },
                            {
                                Floor_Number: 'Fifth Floor',
                                Location: [
                                    {
                                        Name: '5F',
                                    },
                                ],
                            },
                            {
                                Floor_Number: 'Sixth Floor',
                                Location: [
                                    {
                                        Name: '6F',
                                    },
                                ],
                            },
                            {
                                Floor_Number: 'Seven Floor',
                                Location: [
                                    {
                                        Name: '7F',
                                    },
                                ],
                            },
                            {
                                Floor_Number: 'Eight Floor',
                                Location: [
                                    {
                                        Name: '8F',
                                    },
                                ],
                            },
                            {
                                Floor_Number: 'Nineth Floor',
                                Location: [
                                    {
                                        Name: '9F',
                                    },
                                ],
                            },
                            {
                                Floor_Number: 'Tenth Floor',
                                Location: [
                                    {
                                        Name: '10F',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                Name: 'Bengaluru',
            },
        ],
    };

    nodeSelected(node: any): void {
        console.log('njv',node)
        const path = this.buildApiPath(node);
        console.log('API PATH:', path);

        let temp = {
            userId: 1,
            componentMap: 'Staircase_Illumination sensor',
            floorKey: 'Staircase_Illumination sensor',
            // componentMap: path,
            // floorKey: path,
        };

        this.widgetService.selectFloor(temp)

        

    }

    // new logic acc to kk wireframe
    treeData: any[] = [];

    ngAfterViewInit(): void {
        // TEMP: later this will come from API
        // this.treeData = [
        //     {
        //         id: 1,
        //         name: 'India',
        //         type: 'country',
        //         level: 0,
        //         children: [
        //             {
        //                 id: 2,
        //                 name: 'Pune',
        //                 type: 'city',
        //                 level: 1,
        //                 children: [
        //                     {
        //                         id: 3,
        //                         name: 'SEZ',
        //                         type: 'facility',
        //                         level: 2,
        //                         children: [],
        //                     },
        //                 ],
        //             },
        //         ],
        //     },
        // ];

        //  const dbRows = [
        //      {
        //          id: 1,
        //          name: 'India',
        //          type: 'country',
        //          level: 0,
        //          parent_id: null,
        //      },
        //      { id: 2, name: 'Pune', type: 'city', level: 1, parent_id: 1 },
        //      { id: 3, name: 'SEZ', type: 'facility', level: 2, parent_id: 2 },
        //      { id: 9, name: 'Admin', type: 'building', level: 3, parent_id: 3 },

        //      { id: 4, name: 'Pride', type: 'facility', level: 2, parent_id: 2 },
        //      { id: 5, name: 'Japan', type: 'country', level: 2, parent_id: null },
        //      { id: 7, name: 'Tokyo', type: 'city', level: 1, parent_id: 5 },
        //      { id: 8, name: 'FTC', type: 'facility', level: 2, parent_id: 7 },

        //  ];

        this.sidebarService.getTreeSideBarTreeList().subscribe((items: any) => {
            // this.treeData = items
            this.treeData = this.buildTree(items);
        });
    }

    buildTree(rows: any[]): any[] {
        const map = new Map<number, any>();
        const roots: any[] = [];

        rows.forEach((row) => {
            map.set(row.id, { ...row, children: [],parent: null  });
        });

        rows.forEach((row) => {
            const node = map.get(row.id);
            if (row.parent_id === null) {
                roots.push(map.get(row.id));
            }
             else {
                // map.get(row.parent_id)?.children.push(map.get(row.id));
                const parent = map.get(row.parent_id);
                node.parent = parent;          // 👈 THIS IS THE FIX
                parent.children.push(node);
            }
        });

        return roots;
    }

    // build api path
    buildApiPath(node: any): string {
        const parts: string[] = [];
        let current = node;

        while (current) {
            parts.push(
                current.name.toLowerCase().replace(/\s+/g, ''), // remove spaces
            );
            current = current.parent;
        }

        return parts.reverse().join('-');
    }
}