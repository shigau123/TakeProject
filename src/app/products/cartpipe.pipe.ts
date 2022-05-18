import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cartpipe'
})
export class CartpipePipe implements PipeTransform {

  transform(  ): unknown {
    return null;
  }

}
 