import { FilePreviewModel } from 'ngx-awesome-uploader';
import { HttpRequest, HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FilePickerAdapter } from 'ngx-awesome-uploader';
import { UserWService } from './services/user-w.service';
export class DemoFilePickerAdapter extends FilePickerAdapter {
  constructor(
    private http: HttpClient,
    public _uw:UserWService
     ) {
    super();
  }
  public uploadFile(fileItem: FilePreviewModel) {
    const form = new FormData();
    form.append('file', fileItem.file);
    const api = 'https://img.buckapiservices.com:3060/api/containers/tixsImages/upload';
    const req = new HttpRequest('POST', api, form, {reportProgress: true});
    return this.http.request(req)
    .pipe(
      map( (res: HttpEvent<any>) => {
          if (res.type === HttpEventType.Response) {
           this._uw.file=res.body.result.files.file;
           this._uw.buttonDisabled=false;
           this._uw.images=[];
           this._uw.images.push('https://www.buckapiservices.com/imgApi/server/local-storage/tixsImages/'+this._uw.file[0].name);
           return res.body.id.toString();
        } else if (res.type ===  HttpEventType.UploadProgress) {
            // Compute and show the % done:
            const UploadProgress = +Math.round((100 * res.loaded) / res.total);
            return UploadProgress;
        }
      })
      );
  }
    public removeFile(fileItem): Observable<any> {
    const removeApi = 'https://www.buckapiservices.com/imgApi/containers/tixsImages/upload';
    return this.http.post(removeApi, {});
    }
}
