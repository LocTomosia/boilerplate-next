// TODO: 正規表現を頑張って書くの限界があるので、バリデーションライブラリを入れたい

// ref. https =//stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
export const EMAIL_FORMAT_REGEXP =
  /^(([^<>()[\]\\.,; =\s@"]+(\.[^<>()[\]\\.,; =\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// 全角・半角スペース許容全角カナ
export const KATAKANA_REGEXP = /^[ァ-ヴー\u3000 ]+$/;

// 全角・半角スペース許容全角カナ・かな
export const KANA_REGEXP = /^[ァ-ヴぁ-んー\u3000 ]+$/;

// Note: ドメインネームスペースの単体での長さは63がmax
export const URL_VALIDATION_REGEXP =
  /^https?:\/\/(www\.)?([0-9A-Za-z-.@:%_+~#=]+)((\.[a-zA-Z]{2,63})+)(\/(.)*)?(\?(.)*)?$/;

/** 半角スペースの正規表現。UTF-8では全角も含まれる */
export const WHITE_SPACE_REGEXP = /\s/;

/** ハイフンを含まない郵便番号の正規表現 */
export const POSTAL_CODE_WITHOUT_HYPHEN_REGEXP = /^\d{7}$/;

/** ハイフンを含まない電話番号*/
export const TEL_WITHOUT_HYPHEN_REGEXP = /^[0-9]{10,11}$/;
