// 虽然字段很少 但是抽离出来 后续有扩展字段需求就很方便了

interface PiecesItemProps {
  key: number;
  gt: number;
  lte: number;
  color: string;
}

export type { PiecesItemProps };
