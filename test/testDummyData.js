 let incompleteOffer = {
  title: "Mocha testing 1",
  normalPrice: 12.9,
  productName: "Momos",
  category: "restaurant",
  discountedPrice: 10.0,
  description:
    "Whole offer type . Offer such as get flat 4% off every time you scan. ",
  vendor: {
    vendorId: "5f2cf6a9f57a0b0e9c7c047d",
    vendorName: "test",
  },
  thumbnail: "link",
  tags: ["discount", "grocery", "50% off", "offer"],
  website: "nosleeptill6am.com",
  active: true,
  offerEnding: "2020-09-14",
  priority: 3,
  imagesLink: ["link1", "link2", "link3"],
};
let completeOffer = {...incompleteOffer};
completeOffer.offerType = "product";
module.exports ={incompleteOffer,completeOffer}