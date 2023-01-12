export const LOCAL_STORAGE_AUTH_DETAILS_KEY = "authDetails";
export const DATE_FORMAT = "dd.MMM.yyyy";
export const CURRENCY_FORMAT = "INR";

export function thousandsSeprator(no:any){
     return new Intl.NumberFormat('en-IN', 
     { 
      style: 'currency', 
      currency: 'INR',
      minimumFractionDigits:0,
      maximumFractionDigits:0
    }).format(no);
}
