import {
  Component,
  ChangeDetectionStrategy,
  Input,
  TemplateRef,
  WritableSignal,
  signal,
  Signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TreeNode {
  id: number;
  title: string;
  is_deleted: boolean;
  children: TreeNode[];
}

@Component({
  selector: 'app-tree-node',
  standalone: true,
  imports: [CommonModule, TreeNodeComponent],  
  templateUrl: './tree-node.component.html',
  styleUrls: ['./tree-node.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeNodeComponent {
  @Input({ required: true })
  nodes!: Signal<TreeNode[]>;

  /**
   * Шаблон узла.
   * Контекст: $implicit = node,
   * expandAll = () => expandAllFn(node) (если expandAllFn передан)
   */
  @Input({ required: true })
  nodeTemplate!: TemplateRef<{ $implicit: TreeNode; expandAll: () => void }>;

  /**
   * Сигнал «открытых» ID в рамках одного дерева.
   * Если не передан извне — используется локальный пустой Set.
   */
  @Input()
  opened: WritableSignal<Set<number>> = signal(new Set());

  /**
   * Функция-обработчик «Раскрыть все» для этого дерева.
   * Если не передан, остаётся undefined, и кнопка «Раскрыть все» просто не сработает.
   */
  @Input()
  expandAllFn?: (node: TreeNode) => void;

  isOpen(node: TreeNode): boolean {
    return this.opened().has(node.id);
  }

  toggle(node: TreeNode): void {
    const s = new Set(this.opened());
    this.isOpen(node) ? s.delete(node.id) : s.add(node.id);
    this.opened.set(s);
  }


  getContext(node: TreeNode) {
    return {
      $implicit: node,
      expandAll: () => {
        if (this.expandAllFn) {
          this.expandAllFn(node);
        }
      },
    };
  }

  childrenSignal(children: TreeNode[]): Signal<TreeNode[]> {
    return signal(children);
  }
}
