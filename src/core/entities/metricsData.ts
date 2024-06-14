interface IMetric<T> {
  action: string;
  metadata: T;
}

export default IMetric;
