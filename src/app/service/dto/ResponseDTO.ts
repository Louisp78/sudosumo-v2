interface ResponseDTO<T> {
  object: Promise<T>;
  status: number;
}
