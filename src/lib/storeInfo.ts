interface Styles {
    bgStyles: {backgroundColor: string},
    logo: {maxHeight: string},
    template: number,
    textStyles: {color: string},
};

interface Collection { 
    name: number, 
    slug: string,
    collections?: { 
        name: number, 
        slug: string, 
    }[]
};

export  interface StoreInfo {
    name: string,
    slug: string,
    logo: string,
    banner: string,
    styles: object,
    collections: Collection[],
}


// styles: {
//     bgStyles: {backgroundColor: string},
//     logo: {maxHeight: string},
//     template: number,
//     textStyles: {color: string},
// },
// logo?: string
// storeName: string
// collections: { 
//     name: number, 
//     slug: string,
//     collections?: { 
//         name: number, 
//         slug: string, 
//     }[]
// }[]
