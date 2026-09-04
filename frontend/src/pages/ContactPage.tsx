import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { messageService } from "../services/messageService";
import { profileService } from "../services/profileService";
import { Icon } from "../components/common/Icon";
import type { CreateMessageInput } from "../types/message";

export const ContactPage = () => {
  const { t } = useTranslation();
  const [isSuccess, setIsSuccess] = useState(false);

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
      await messageService.create(data as CreateMessageInput);
      setIsSuccess(true);
      toast.success(t("contact.form.success"));
      reset();
    } catch (err) {
      toast.error(t("contact.form.failed"));
    }
  };

  const githubUrl = profile?.socialLinks?.github ?? "https://github.com/4yangXYAO";

  // Generic split: italicize the last word of the title as a serif accent.
  const renderTitle = (title: string) => {
    const words = title.trim().split(/\s+/);
    if (words.length < 2) return title;
    const last = words.pop() as string;
    return (
      <>
        {words.join(" ")}{" "}
        <span className="font-serif italic text-amber">{last}</span>
      </>
    );
  };

  return (
    <div className="container-x section-y pt-32">
      {/* Header */}
      <header className="max-w-3xl">
        <p className="eyebrow">{t("contact.label")}</p>
        <h1 className="mt-4 text-display-xl font-extrabold text-paper">
          {renderTitle(t("contact.title"))}
        </h1>
      </header>

      <div className="mt-14 grid gap-12 lg:grid-cols-12">
        {/* LEFT — col-span-5 */}
        <div className="lg:col-span-5">
          <p className="text-lead text-paper-dim">{t("contact.subtitle")}</p>

          {/* Availability well */}
          <div className="well mt-8 p-5">
            <p className="eyebrow">{t("contact.availability.title")}</p>
            <div className="mt-3 flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-2.5 w-2.5 rounded-full bg-signal animate-pulse-ring"
              />
              <span className="text-paper">{t("contact.availability.status")}</span>
            </div>
            <p className="mt-1.5 font-mono text-[10px] text-paper-faint">
              {t("contact.availability.response")}
            </p>
          </div>

          {/* Direct channels */}
          <div className="mt-10">
            <p className="field-label">{t("contact.direct.title")}</p>

            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-line group flex items-center gap-4 border-t border-ink-line py-4 transition-transform hover:translate-x-1"
            >
              <Icon name="github" size={18} className="text-amber" />
              <span className="text-sm text-paper-dim">
                {t("contact.direct.github")}
              </span>
              <span className="ml-auto truncate font-mono text-[13px] text-paper-faint">
                {githubUrl}
              </span>
            </a>

            {profile?.socialLinks?.linkedin && (
              <a
                href={profile.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="link-line group flex items-center gap-4 border-t border-ink-line py-4 transition-transform hover:translate-x-1"
              >
                <Icon name="linkedin" size={18} className="text-amber" />
                <span className="text-sm text-paper-dim">
                  {t("contact.direct.linkedin")}
                </span>
                <span className="ml-auto truncate font-mono text-[13px] text-paper-faint">
                  {profile.socialLinks.linkedin}
                </span>
              </a>
            )}

            {profile?.email && (
              <a
                href={`mailto:${profile.email}`}
                target="_blank"
                rel="noopener noreferrer"
                className="link-line group flex items-center gap-4 border-t border-ink-line py-4 transition-transform hover:translate-x-1"
              >
                <Icon name="mail" size={18} className="text-amber" />
                <span className="text-sm text-paper-dim">
                  {t("contact.direct.email")}
                </span>
                <span className="ml-auto truncate font-mono text-[13px] text-paper-faint">
                  {profile.email}
                </span>
              </a>
            )}
          </div>
        </div>

        {/* RIGHT — col-span-7 */}
        <div className="lg:col-span-7">
          {isSuccess ? (
            <div className="well flex flex-col items-center justify-center p-10 text-center">
              <Icon name="check" size={32} className="text-amber" />
              <p className="mt-4 max-w-xs font-serif text-xl italic text-paper">
                {t("contact.form.success")}
              </p>
            </div>
          ) : (
            <div className="card p-6 sm:p-8">
              <h2 className="font-display text-xl text-paper">
                {t("contact.formTitle")}
              </h2>
              <p className="mt-1 font-mono text-[10px] text-paper-faint">
                {t("contact.formNote")}
              </p>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-8 space-y-6"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="field-label"
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
                    <p className="mt-1.5 text-sm text-amber">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="field-label"
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
                    <p className="mt-1.5 text-sm text-amber">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="field-label"
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
                    <p className="mt-1.5 text-sm text-amber">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary group w-full sm:w-auto disabled:opacity-60"
                >
                  {isSubmitting ? t("contact.form.sending") : t("contact.form.send")}
                  <Icon
                    name="send"
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
