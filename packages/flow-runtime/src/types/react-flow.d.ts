export type RFConnection = {
  source: string | null;
  target: string | null;
  sourceHandle: string | null;
  targetHandle: string | null;
};

export type RFNode<T = any> = {
  id: string;
  data: T;
  type: string;
  className?: string;
  hidden?: boolean;
  selected?: boolean;
  dragging?: boolean;
  draggable?: boolean;
  selectable?: boolean;
  connectable?: boolean;
  deletable?: boolean;
  dragHandle?: string;
  width?: number | null;
  height?: number | null;
  parentNode?: string;
  zIndex?: number;
  expandParent?: boolean;
  ariaLabel?: string;
  focusable?: boolean;
  resizing?: boolean;
};

///
type RFEdgeLabelOptions = {
  label?: string | any;
  labelStyle?: any;
  labelShowBg?: boolean;
  labelBgStyle?: any;
  labelBgPadding?: [number, number];
  labelBgBorderRadius?: number;
};

// interface for the user edge items
type RFDefaultEdge<T = any> = {
  id: string;
  type?: string;
  source: string;
  target: string;
  sourceHandle?: string | null;
  targetHandle?: string | null;
  style?: any;
  animated?: boolean;
  hidden?: boolean;
  deletable?: boolean;
  data?: T;
  className?: string;
  sourceNode?: RFNode;
  targetNode?: RFNode;
  selected?: boolean;
  markerStart?: any;
  markerEnd?: any;
  zIndex?: number;
  ariaLabel?: string;
  interactionWidth?: number;
  focusable?: boolean;
} & RFEdgeLabelOptions;

export type RFSmoothStepPathOptions = {
  offset?: number;
  borderRadius?: number;
};

type RFSmoothStepEdgeType<T> = RFDefaultEdge<T> & {
  type: "smoothstep";
  pathOptions?: RFSmoothStepPathOptions;
};

export type RFBezierPathOptions = {
  curvature?: number;
};

type RFBezierEdgeType<T> = RFDefaultEdge<T> & {
  type: "default";
  pathOptions?: RFBezierPathOptions;
};

export type RFEdge<T = any> =
  | RFDefaultEdge<T>
  | RFSmoothStepEdgeType<T>
  | RFBezierEdgeType<T>;
