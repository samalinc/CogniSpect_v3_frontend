export default function readFile(file) {
  const reader = new FileReader();
  return reader.readaAsDataUrl(file);
}

