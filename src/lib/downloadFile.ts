type DownloadFileArgs = {
  uri: string;
  filename: string;
};

export function downloadFile({ uri, filename }: DownloadFileArgs) {
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = uri;
  a.setAttribute('download', filename);
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(uri);
}
