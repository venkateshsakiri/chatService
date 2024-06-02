export function calculateTotalAmount(products:any){
    let totalAmount = 0;
    products.forEach((element:any) => {
        totalAmount+=Number(element.Amount);
    });
    return totalAmount;
}

export function calculateIncreaseAmount(totalAmount:any,productAmount:any){
    return totalAmount + productAmount;
}
export function calculateDecreaseAmount(totalAmount:any,productAmount:any){
    return totalAmount - productAmount;
}