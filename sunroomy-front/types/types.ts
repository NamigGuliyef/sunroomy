export interface ISubProductFeature {
  _id: string;
  title: string;
  description: string;
  icon: string;
  subProductId: string;
  createdAt: string;
  updatedAt: string;
}
export interface ISubProductFeatures {
  features: ISubProductFeature[];
}
export interface ISubProductSpecification {
  _id: string;
  key: string;
  value: string;
  subProductId: string;
  createdAt: string;
  updatedAt: string;
}
export interface ISubProductSpecifications {
  specifications: ISubProductSpecification[];
}
export type IWhyUs = {
  _id: string;
  title: string;
  description: string;
  about_outdorr: Array<{
    _id: string;
    key: string;
    value: string;
  }>;
  createdAt: string;
  updatedAt: string;
};
export interface IFeature {
  _id: string;
  title: string;
  type: string;
  description: string;
  icon: string;
  projectId: string;
  subProductId: string;
  createdAt: string;
  updatedAt: string;
}
export interface IFeatures {
  features: IFeature[];
}
export interface ISubProduct {
  _id: string;
  title: string;
  description: string;
  description_2: string;
  cover_photo: string;
  slug: string;
  photos: string[];
  featuresIds: ISubProductFeature[];
  specifications: ISubProductSpecification[];
  applicationIds: IProductApplication[];
  productId: IProduct;
  statusCode: number;
  photo: string;
  subProductIds: ISubProduct[];
  createdAt: string;
  updatedAt: string;
}
export interface IExtendedSubproduct extends ISubProduct {}

export interface ISubProducts {
  subproducts: ISubProduct[];
}
export interface IProduct {
  _id: string;
  title: string;
  description: string;
  statusCode: number;
  photo: string;
  subProductIds: ISubProduct[];
  createdAt: string;
  slug: string;
  updatedAt: string;
}
export interface IProducts {
  products: IProduct[];
}
export interface IProject {
  _id: string;
  type: string;
  title: string;
  location: string;
  used_products_joint: string;
  description: string;
  slug: string;
  cover_photo: string;
  photos: string[];
  needsId: {
    _id: string;
    title: string;
    description: string;
    createdAt: string;
    updatedAt: string;
  };
  featuresId: IFeature[];
  usedProductsId: {
    _id: string;
    title: string;
    description: string;
    photos: string[];
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface IExtendedProject extends IProject {
  id: number;
  images: { image: string }[];
  tech: string;
  needs: string;
  features: string;
  image: string;
}

export interface IProjects {
  projects: IProject[];
}
export type IContacts = IContact[];

export interface IContact {
  _id: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  mapLink: string;
  createdAt: string;
  updatedAt: string;
}
export interface IProjectNeed {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}
export interface IProductApplication {
  _id: string;
  title: string;
  description: string;
  photos: string[];
}
export interface IApplications {
  applications: IProductApplication[];
}
export interface INeeds {
  needs: IProjectNeed[];
}
export type AboutOutdorr = {
  _id: string;
  key: string;
  value: string;
};

export type WhyData = {
  _id: string;
  title: string;
  description: string;
  about_outdorr: AboutOutdorr[];
  createdAt: string;
  updatedAt: string;
};

export interface IDesignData {
  _id: string;
  title: string;
  description: string;
  design_details: IDesignDetailsData[];
  createdAt: AtedAt;
  updatedAt: AtedAt;
}

export interface IDesignDetailsData {
  _id: string;
  step: string;
  title: string;
  description: string;
  photo: string;
  project_design: string;
  createdAt: AtedAt;
  updatedAt: AtedAt;
}

export interface ID {
  $oid: string;
}

export interface AtedAt {
  $date: string;
}

export interface IUsedProduct {
  _id: string;
  title: string;
  description: string;
  photos: string[];
}

export interface IUsedProducts {
  usedProducts: IUsedProduct[];
}
export interface IRequest {
  _id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  main_structure_model: string;
  width_in_feet: number;
  projection_in_feet: number;
  height_in_feet: number;
  structure_situation: string;
  structure_color: string;
  window_and_doors: string[];
  sunscreens: string[];
  files: string[];
  project_details: string;
  about_us: string;
  createdAt: string;
  updatedAt: string;
}

export interface IRequests {
  requests: IRequest[];
}

export interface IInspire {
  _id: string;
  title: string;
  description: string;
  photos: string[];
}

export interface IAboutUs {
  _id: string;
  description: string;
  years_of_experience: number;
  product_systems: number;
  partners: number;
  [key: string]: string | number | undefined;
}
export interface IAboutUsData {
  aboutUsData: IAboutUs[];
}
