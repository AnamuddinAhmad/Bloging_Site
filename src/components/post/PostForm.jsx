import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Inputs, Select, RTE } from "../index";
import appwriteService from "../../appwrite/consf";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PostForm = ({ post }) => {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.useData);

  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        content: post?.content || "",
        slug: post?.slug || "",
        status: post?.status || "active",
      },
    });

  const submit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? appwriteService.uploadFile(data.image[0])
        : null;

      if (file) {
        appwriteService.deleteFile(post.featuredImage);
      }

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) navigate(`/post/${dbPost.$id}`);
    } else {
      const file = data.image[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;
      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await appwriteService.createPost({
          ...data,
          userId: userData.$id,
        });
        if (dbPost) navigate(`/post/${dbPost.$id}`);
      }
    }
  };

  const slugTrasform = useCallback((value) => {
    if (value && typeOf === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/^[a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTrasform(value.title, { shouldValidate: true }));
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugTrasform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Inputs
          lable="Title"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Inputs
          lable="Slug"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) =>
            setValue("slug", slugTrasform(e.currentTarget.value), {
              shouldValidate: true,
            })
          }
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w=1/3 px-2">
        <Inputs
          lable="Featured Image"
          type="file"
          className="mb-4"
          accept="image/png, image/jpeg, image/jpg, image/gif"
          {...register("image", { reduired: !post })}
        />

        {post && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
        op
        />
      </div>
    </form>
  );
};

export default PostForm;
