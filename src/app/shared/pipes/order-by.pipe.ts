import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

 transform(array, val = 'featuredSort'){
     
     if (!val || val.trim() == ""){
       return array;
     } 

     //ascending
     if (val == 'asc'){
       return Array.from(array).sort((item1: any, item2: any) => { 
         return this.orderByComparator(item1['id'], item2['id']);
       });
     } else if(val == 'desc'){ // desc
       return Array.from(array).sort((item1: any, item2: any) => { 
         return this.orderByComparator(item2['id'], item1['id']);
       });
     } else if(val == 'a-z') { // a-z
       return Array.from(array).sort((a: any, b: any) => { 
         if ( a['name'] < b['name'] ){
          return -1;
        } else if ( a['name'] > b['name'] ){
            return 1;
        } else {
          return 0;  
        }
       });
     } else if(val == 'z-a') { // z-a
       return Array.from(array).sort((a: any, b: any) => { 
         if ( a['name'] > b['name'] ){
          return -1;
        } else if ( a['name'] < b['name'] ){
          return 1;
        } else {
          return 0;  
        }
       });
    } else if(val == 'low') { // low to high
       return Array.from(array).sort((a: any, b: any) => { 
         if ( a['prod_price'] < b['prod_price'] ){
          return -1;
        } else if ( a['prod_price'] > b['prod_price'] ){
            return 1;
        } else {
          return 0;  
        }
       });
    } else if(val == 'high') { // high to low
       return Array.from(array).sort((a: any, b: any) => { 
         if ( a['prod_price'] > b['prod_price'] ){
          return -1;
        } else if ( a['prod_price'] < b['prod_price'] ){
          return 1;
        } else {
          return 0;  
        }
       });
     }else if(val == 'featuredSort'){ 
      return Array.from(array).sort((item: any) => { 
        if(item['prod_featured']==1){
         return -1;
        }
      });
    } else if(val == 'featured'){ 
      return Array.from(array).filter((item: any) => { 
        if(item['prod_featured']==1){
         return item;
        }
      });
    }
    else if(val == 'bestSeller'){ 
      return Array.from(array).filter((item: any) => { 
        if(item['prod_bestseller']==1){
         return item;
        }
      });
    }
    else if(val == 'newProducts'){
      return Array.from(array).filter((item: any) => { 
        if(item['prod_newproducts']==1){
         return item;
        }
      });
    }

 }

 orderByComparator(a:any, b:any):number{

     if((isNaN(parseFloat(a)) || !isFinite(a)) || (isNaN(parseFloat(b)) || !isFinite(b))){
       //Isn't a number so lowercase the string to properly compare
       if(a.toLowerCase() < b.toLowerCase()) return -1;
       if(a.toLowerCase() > b.toLowerCase()) return 1;
     }
     else{
       //Parse strings as numbers to compare properly
       if(parseFloat(a) < parseFloat(b)) return -1;
       if(parseFloat(a) > parseFloat(b)) return 1;
      }

     return 0; //equal each other
 }

}
