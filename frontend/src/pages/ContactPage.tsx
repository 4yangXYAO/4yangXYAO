import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { messageService } from "../services/messageService";
import { profileService } from "../services/profileService";
import { Reveal } from "../components/common/Reveal";
import { Icon } from "../components/common/Icon";
import type { CreateMessageInput } from "../types/message";

export const ContactPage = () => {
  const { t } = useTranslation();

  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: () => profileService.get(),
  });

  const contactSchema = z.object({
    name: z.string().min(1, t("contact.form.validation.name")),
    email: z
      .string()
      .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, t("contact.form.validation.email")),
    message: z.string().min(10, t("contact.form.validation.message")),
  });

  type ContactFormData = z.infer<typeof contactSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      await messageService.create(
        data as CreateMessageInput,
      );
      toast.success(t("contact.form.success"));
      reset();
    } catch (err) {
      toast.error(t("contact.form.failed"));
    }
  };

  const githubUrl = profile?.socialLinks?.github ?? "https://github.com/4yangXYAO";

  return (
    <div className="grid gap-16 section-y pt-32 container-x lg:grid-cols-2">
      {/* Left column — intro + direct links */}
      <div>
        <p className="eyebrow">{t("contact.label")}</p>
        <h1 className="mt-4 text-display-lg">{t("contact.title")}</h1>
        <p className="mt-6 text-lead text-paper-dim">{t("contact.subtitle")}</p>

        <div className="mt-12">
          <h2 className="font-mono text-[11px] uppercase tracking-wider text-paper-faint">
            {t("contact.direct.title")}
          </h2>

          <div className="mt-4">
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 border-b border-ink-line py-4 transition-transform hover:translate-x-1"
            >
              <Icon name="github" size={18} className="text-amber" />
              <span className="flex flex-col">
                <span className="text-sm text-paper-dim">
                  {t("contact.direct.github")}
                </span>
                <span className="text-[13px] text-paper-faint">{githubUrl}</span>
              </span>
              <Icon
                name="arrow-up-right"
                size={16}
                className="ml-auto text-paper-faint"
              />
            </a>

            {profile?.socialLinks?.linkedin && (
              <a
                href={profile.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 border-b border-ink-line py-4 transition-transform hover:translate-x-1"
              >
                <Icon name="linkedin" size={18} className="text-amber" />
                <span className="flex flex-col">
                  <span className="text-sm text-paper-dim">
                    {t("contact.direct.linkedin")}
                  </span>
                  <span className="text-[13px] text-paper-faint">
                    {profile.socialLinks.linkedin}
                  </span>
                </span>
                <Icon
                  name="arrow-up-right"
                  size={16}
                  className="ml-auto text-paper-faint"
                />
              </a>
            )}

            {profile?.email && (
              <a
                href={`mailto:${profile.email}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 border-b border-ink-line py-4 transition-transform hover:translate-x-1"
              >
                <Icon name="mail" size={18} className="text-amber" />
                <span className="flex flex-col">
                  <span className="text-sm text-paper-dim">
                    {t("contact.direct.email")}
                  </span>
                  <span className="text-[13px] text-paper-faint">
                    {profile.email}
                  </span>
                </span>
                <Icon
                  name="arrow-up-right"
                  size={16}
                  className="ml-auto text-paper-faint"
                />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Right column — form card */}
      <Reveal className="card p-8 md:p-10">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm text-paper-dim"
            >
              {t("contact.form.name")}
            </label>
            <input
              id="name"
              {...register("name")}
              placeholder={t("contact.form.namePlaceholder")}
              className="field"
            />
            {errors.name && (
              <p className="mt-1.5 text-[13px] text-red-400">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm text-paper-dim"
            >
              {t("contact.form.email")}
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              placeholder={t("contact.form.emailPlaceholder")}
              className="field"
            />
            {errors.email && (
              <p className="mt-1.5 text-[13px] text-red-400">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="message"
              className="mb-2 block text-sm text-paper-dim"
            >
              {t("contact.form.message")}
            </label>
            <textarea
              id="message"
              rows={5}
              {...register("message")}
              placeholder={t("contact.form.messagePlaceholder")}
              className="field"
            />
            {errors.message && (
              <p className="mt-1.5 text-[13px] text-red-400">
                {errors.message.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary group w-full sm:w-auto"
          >
            {isSubmitting ? t("contact.form.sending") : t("contact.form.send")}
            <Icon
              name="send"
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>
        </form>
      </Reveal>
    </div>
  );
};
