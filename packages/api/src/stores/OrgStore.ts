import IOrg from './../interfaces/IOrg';
import { Org } from './../models/Org';

export default class OrgStore {
  public static OPERATION_UNSUCCESSFUL = class extends Error {
    constructor() {
      super('An error occured while processing the request.');
    }
  };

  public async create(attributes: IOrg): Promise<IOrg> {
    let org = new Org(attributes);
    try {
      return await org.save();
    } catch (e) {
      console.error(e);
      return Promise.reject(new OrgStore.OPERATION_UNSUCCESSFUL());
    }
  }

  public async update(userId: string, org: IOrg): Promise<IOrg> {
    try {
      return await Org.findOneAndUpdate(
      { 
        userId: userId,
        _id: org._id
      },
      { 
        $set: org 
      }, 
      { 
        new: true
      });
    } catch (e) {
      console.error(e);
      return Promise.reject(new OrgStore.OPERATION_UNSUCCESSFUL());
    }
  }

  public async list(userId: string): Promise<IOrg[]> {
    try {
      return await Org.find(userId ? { userId } : null);
    } catch (e) {
      console.error(e);
      return Promise.reject(new OrgStore.OPERATION_UNSUCCESSFUL());
    }
  }

  public async get(orgId: string): Promise<IOrg> {
    try {
      return await Org.findById(orgId);
    } catch (e) {
      console.error(e);
      return Promise.reject(new OrgStore.OPERATION_UNSUCCESSFUL());
    }
  }
  
  public async delete(userId: string, orgId: string): Promise<boolean> {
    let org: IOrg;
    try {
      org = await Org.findOneAndUpdate(
        {
          userId: userId,
          _id: orgId
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
      return Promise.reject(new OrgStore.OPERATION_UNSUCCESSFUL());
    }
    return !org.active;
  }
}
