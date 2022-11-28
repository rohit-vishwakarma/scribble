export const StatusListForDraftedArticle = [
  "Save draft",
  "Publish",
  "Publish later",
];

export const StatusListForPublishedArticle = [
  "Save draft",
  "Publish",
  "Unpublish later",
];

export const StatusListForScheduledArticle = [
  "Save draft",
  "Publish",
  "Publish later",
  "Unpublish later",
];

export const ARTICLES_FORM_INITIAL_VALUES = {
  title: "",
  body: "",
  category: null,
  status: "Draft",
  scheduledPublish: null,
  scheduledUnpublish: null,
};
