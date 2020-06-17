import { Intent } from '@blueprintjs/core'

export const DISCONNECTED = {
    title: 'Vous avez été déconnecté',
    content: 'Veuillez vous reconnecter ci-dessous',
    intent: Intent.WARNING,
}

export const WRONG_CREDENTIALS = {
    title: "Nom d'utilisateur ou mot de passe erroné",
    content:
        "Votre mot de passe ou nom d'utilisateur n'a pas permis de vous identifier",
    intent: Intent.DANGER,
}

export const USER_ALREADY_EXISTS = {
    title: 'Erreur',
    content: "L'utilisateur existe déjà",
    intent: Intent.DANGER,
}

export const USER_CREATED_SUCCESSFULLY = {
    title: "L'utilisateur a bien été créé",
    content: 'Un e-mail avec ses identifiants et mot de passe lui a été envoyé',
    intent: Intent.SUCCESS,
}
export const INTERNAL_ERROR = {
    title: "Une erreur interne s'est produite",
    content:
        'Vous pouvez envoyer un e-mail à contact@kemos.care pour de plus ample informations',
    intent: Intent.DANGER,
}
