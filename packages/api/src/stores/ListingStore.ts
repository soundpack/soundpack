import IListing from './../interfaces/IListing';
import { Listing } from './../models/Listing';

export default class ListingStore {
  public static OPERATION_UNSUCCESSFUL = class extends Error {
    constructor() {
      super('An error occured while processing the request.');
    }
  };

  public async create(attributes: IListing): Promise<IListing> {
    let listing = new Listing(attributes);
    try {
      return await listing.save();
    } catch (e) {
      console.error(e);
      return Promise.reject(new ListingStore.OPERATION_UNSUCCESSFUL());
    }
  }

  public async update(orgId: string, listing: IListing): Promise<IListing> {
    try {
      return await Listing.findOneAndUpdate(
      { 
        orgId: orgId,
        _id: listing._id
      },
      { 
        $set: listing 
      }, 
      { 
        new: true
      });
    } catch (e) {
      console.error(e);
      return Promise.reject(new ListingStore.OPERATION_UNSUCCESSFUL());
    }
  }

  public async list(orgId: string): Promise<IListing[]> {
    try {
      return await Listing.find(orgId ? { orgId } : null).sort({createdAt: -1});
    } catch (e) {
      console.error(e);
      return Promise.reject(new ListingStore.OPERATION_UNSUCCESSFUL());
    }
  }

  public async get(listingId: string): Promise<IListing> {
    try {
      return await Listing.findById(listingId);
    } catch (e) {
      console.error(e);
      return Promise.reject(new ListingStore.OPERATION_UNSUCCESSFUL());
    }
  }
  
  public async delete(orgId: string, listingId: string): Promise<boolean> {
    let listing: IListing;
    try {
      listing = await Listing.findOneAndUpdate(
        {
          orgId: orgId,
          _id: listingId
        },
        {
          $set: {
            active: false,
          }
        },
        {
          new: true
        });
    } catch (e) {
      console.error(e);
      return Promise.reject(new ListingStore.OPERATION_UNSUCCESSFUL());
    }
    return !listing.active;
  }
}
