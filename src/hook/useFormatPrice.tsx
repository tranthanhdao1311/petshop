
const useFormatPrice = (data: any) => {

    const f = new Intl.NumberFormat("vi-VN", {
        style: 'currency',
        currency: 'VND',
    })

    const format = f.format(data)

    return { format };
};

export default useFormatPrice;