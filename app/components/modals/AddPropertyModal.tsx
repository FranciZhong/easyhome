"use client";

import useAddPropertyStore from "@/app/stores/useAddPropertyStore";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { Location } from "@/app/types/location";
import { catchClientError } from "@/app/utils/httpHandler";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";
import Heading from "../Heading";
import IconBox from "../IconBox";
import ImageBox from "../ImageBox";
import MapBox, { ViewState } from "../MapBox";
import AddressInput from "../inputs/AddressInput";
import CategoryInput from "../inputs/CategoryInput";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import { categories } from "../navbar/Categories";
import Modal from "./Modal";

enum STEP {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
}

const initViewState = {
  longitude: 144.9631,
  latitude: -37.8136,
  zoom: 10,
};

const AddPropertyModal = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const addPropertyStore = useAddPropertyStore();

  const [step, setStep] = useState(STEP.CATEGORY);
  const stepNext = () => setStep((value) => value + 1);
  const stepBack = () => setStep((value) => value - 1);

  const [viewState, setViewState] = useState<ViewState>(initViewState);

  const [markLocation, setMarkLocation] = useState<Location | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      address: "",
      location: [],
      title: "",
      description: "",
      guestCount: 1,
      bedroomCount: 1,
      bathroomCount: 1,
      images: [],
      price: 1,
    },
  });

  const category: string = watch("category");
  const address: string = watch("address");
  const bedroomCount: number = watch("bedroomCount");
  const bathroomCount: number = watch("bathroomCount");
  const guestCount: number = watch("guestCount");
  const images: string[] = watch("images");

  const updateFormValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const submitHandler: SubmitHandler<FieldValues> = async (data) => {
    if (step !== STEP.DESCRIPTION) {
      stepNext();
      return;
    }

    setIsLoading(true);
    await catchClientError(
      () => axios.post("/api/property/add", data),
      (data) => {
        addPropertyStore.onClose();
        reset();
        setStep(STEP.CATEGORY);
        router.push("/");
        toast.info("Your property successfully added!!");
      },
      (err) => {},
      () => {
        setIsLoading(false);
      },
    );
  };

  const onSelectLocation = useCallback((location: Location) => {
    updateFormValue("address", location.address);
    updateFormValue("location", [
      location.coordinates.longitude,
      location.coordinates.latitude,
    ]);
    setViewState({
      ...viewState,
      ...location.coordinates,
    });
    setMarkLocation(location);
  }, []);

  const onImageUploaded = (imageSrc: string) => {
    const newImages = [...images, imageSrc];
    updateFormValue("images", newImages);
  };

  const onRemoveImage = (imageSrc: string) => {
    updateFormValue(
      "images",
      images.filter((item) => item !== imageSrc),
    );
  };

  let getBodyContent = () => {
    switch (step) {
      case STEP.CATEGORY:
        return (
          <>
            <Heading
              title="About your property"
              subtitle="Select a category that best describe your place."
            />
            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-3
              "
            >
              {categories.map((item) => {
                return (
                  <CategoryInput
                    key={item.label}
                    {...item}
                    size={24}
                    selected={category === item.label}
                    onClick={(value) => updateFormValue("category", value)}
                  />
                );
              })}
            </div>
          </>
        );

      case STEP.LOCATION:
        return (
          <>
            <Heading title="Address" subtitle="Tell us where is this place." />
            {/* todo [warning] the access token is public */}
            <AddressInput
              id="address"
              label="address"
              address={address}
              disabled={isLoading}
              onChange={(value) => updateFormValue("address", value)}
              onSelect={onSelectLocation}
            />
            {/* todo solve rerendering by useRef & useIm */}
            <MapBox
              defaultViewState={viewState}
              onMove={(e) => setViewState(e.viewState)}
              markers={markLocation?.coordinates && [markLocation?.coordinates]}
            />
          </>
        );

      case STEP.INFO:
        return (
          <>
            <Heading
              title="Room information"
              subtitle="Tell us more about your property."
            />
            <Counter
              id="bedroomCount"
              label="How many bedrooms?"
              value={bedroomCount}
              onAdd={() => {
                updateFormValue("bedroomCount", bedroomCount + 1);
              }}
              onMinus={() => {
                updateFormValue(
                  "bedroomCount",
                  bedroomCount > 1 ? bedroomCount - 1 : 1,
                );
              }}
            />
            <hr />
            <Counter
              id="bathroomCount"
              label="How many bathrooms?"
              value={bathroomCount}
              onAdd={() => {
                updateFormValue("bathroomCount", bathroomCount + 1);
              }}
              onMinus={() => {
                updateFormValue(
                  "bathroomCount",
                  bathroomCount > 1 ? bathroomCount - 1 : 1,
                );
              }}
            />
            <hr />
            <Counter
              id="guestCount"
              label="How many guests allowed?"
              value={guestCount}
              onAdd={() => {
                updateFormValue("guestCount", guestCount + 1);
              }}
              onMinus={() => {
                updateFormValue(
                  "guestCount",
                  guestCount > 1 ? guestCount - 1 : 1,
                );
              }}
            />
          </>
        );

      case STEP.IMAGES:
        return (
          <>
            <Heading
              title="Images"
              subtitle="Add some images for your home to attract more people!"
            />
            <ImageUpload onImageUploaded={onImageUploaded} />
            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-2
                xl:grid-cols-3
                gap-3
              "
            >
              {images.map((item) => {
                return (
                  <ImageBox key={item} image={item}>
                    <div
                      className="
                        absolute
                        top-1
                        right-1
                      "
                    >
                      <IconBox
                        useDark={false}
                        isSmall={true}
                        onClick={() => onRemoveImage(item)}
                      >
                        <AiOutlineClose />
                      </IconBox>
                    </div>
                  </ImageBox>
                );
              })}
            </div>
          </>
        );

      case STEP.DESCRIPTION:
        return (
          <>
            <Heading title="Title" subtitle="How do you name this property?" />
            <Input
              id="title"
              label="Title"
              required={true}
              register={register}
              errors={errors}
            />
            <Heading
              title="Description"
              subtitle="Tell people more about your place."
            />
            <Input
              id="description"
              label="Description"
              required={true}
              type="textarea"
              register={register}
              errors={errors}
            />
            <Heading
              title="Pricing"
              subtitle="Set a standard price per night for this place."
            />
            {/* todo number type does't work */}
            <Input
              id="price"
              label="Price"
              type="number"
              formatPrice={true}
              required={true}
              register={register}
              errors={errors}
            />
          </>
        );
    }
  };

  const bodyContent = (
    <div
      className="
          flex
          flex-col
          gap-4
        "
    >
      {getBodyContent()}
    </div>
  );

  return (
    <Modal
      title="New Property"
      body={bodyContent}
      isOpen={addPropertyStore.isOpen}
      disabled={isLoading}
      secondaryActionLabel={step === STEP.CATEGORY ? undefined : "Back"}
      onSecondaryAction={step === STEP.CATEGORY ? undefined : stepBack}
      actionLabel={step === STEP.DESCRIPTION ? "Submit" : "Next"}
      onSubmit={handleSubmit(submitHandler)}
      onClose={addPropertyStore.onClose}
    />
  );
};

export default AddPropertyModal;
