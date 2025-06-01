import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeNodeComponent, TreeNode } from './tree-node/tree-node.component';

const TREE_DATA: TreeNode[] = [
  {
    id: 1,
    title: 'Значение 1',
    is_deleted: false,
    children: [
      {
        id: 2,
        title: 'Значение 1.1',
        is_deleted: false,
        children: [
          {
            id: 3,
            title: 'Значение 1.1.1',
            is_deleted: true,
            children: [
              { id: 15, title: 'Значение 1.1.1.1', is_deleted: false, children: [] },
              { id: 616, title: 'Значение 1.1.1.2', is_deleted: false, children: [] }
            ]
          }
        ]
      },
      {
        id: 4,
        title: 'Значение 1.2',
        is_deleted: false,
        children: [
          { id: 5, title: 'Значение 1.2.1', is_deleted: false, children: [] },
          { id: 6, title: 'Значение 1.2.2', is_deleted: false, children: [] }
        ]
      }
    ]
  },
  {
    id: 7,
    title: 'Значение 2',
    is_deleted: false,
    children: [
      {
        id: 8,
        title: 'Значение 2.1',
        is_deleted: true,
        children: [
          {
            id: 22,
            title: 'Значение 2.1.1.1.1',
            is_deleted: true,
            children: [
              {
                id: 21,
                title: 'Значение 2.1.1.1.1.1',
                is_deleted: false,
                children: [
                  {
                    id: 20,
                    title: 'Значение 2.1.1.1.1.1.1',
                    is_deleted: false,
                    children: []
                  }
                ]
              },
              { id: 19, title: 'Значение 2.1.1.1.1.2', is_deleted: false, children: [] }
            ]
          },
          {
            id: 9,
            title: 'Значение 2.1.1',
            is_deleted: true,
            children: [
              {
                id: 10,
                title: 'Значение 2.1.1.1',
                is_deleted: true,
                children: [
                  {
                    id: 11,
                    title: 'Значение 2.1.1.1.1',
                    is_deleted: true,
                    children: [
                      {
                        id: 12,
                        title: 'Значение 2.1.1.1.1.1',
                        is_deleted: false,
                        children: [
                          {
                            id: 13,
                            title: 'Значение 2.1.1.1.1.1.1',
                            is_deleted: false,
                            children: []
                          }
                        ]
                      },
                      { id: 14, title: 'Значение 2.1.1.1.1.2', is_deleted: false, children: [] }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TreeNodeComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  treeSignal = signal<TreeNode[]>(TREE_DATA);



  openedSignal2: WritableSignal<Set<number>> = signal(new Set());


  expandAll2 = (node: TreeNode) => {
    const newSet = new Set(this.openedSignal2());
    const walk = (n: TreeNode) => {
      newSet.add(n.id);
      n.children.forEach(walk);
    };
    walk(node);
    this.openedSignal2.set(newSet);
  };

  logNode(id: number): void {
    console.log(`нажали на узел ID ${id}`);
  }
}
