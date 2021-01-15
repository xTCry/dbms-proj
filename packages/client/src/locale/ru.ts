import russianMessages from 'ra-language-russian';

const customMessages = {
    ...russianMessages,
    bo: {
        configuration: 'Конфигурация',
        language: 'Язык',
        theme: {
            name: 'Тема',
            light: 'Светлая',
            dark: 'Тёмная',
        },
        wrong_login_password: 'Неверный логин или пароль',
        invalid_access_token: 'Неверный токен доступа',
        token_expired: 'Токен просрочился, повторите авторизацию',
        role_forbidden: 'Ваша роль не разрешена',
    },
    resources: {
        student: {
            name: 'Студент |||| Студенты',
            fields: {
                name: 'Название группы',
                student_id: 'Номер зачетки',
                group_id: 'Группа',
                user_id: 'Пользователь',
                'user.role_id': 'Роль',
            },
        },
        user: {
            name: 'Пользователь |||| Пользователи',
            fields: {
                login: 'Логин',
                name: 'Имя',
                last_name: 'Фамилия',
                first_name: 'Отчество',
                password: 'Пароль',
                personal_address: 'Адрес',
                personal_birthday: 'Дата рождения',
                personal_telephone: 'Телефон',
                role_id: 'Роль',
                photo_path: 'Фото профиля',
            },
        },
        teacher: {
            name: 'Преподаватель |||| Преподаватели',
            fields: {
                lessons: 'Ведет предметы',
                'lesson_name': 'Предмет',
            },
        },
        role: {
            name: 'Роли',
            data: {
                NONE: 'Никто',
                USER: 'Пользователь',
                STUDENT: 'Студент',
                TEACHER: 'Преподаватель',
                DEKAN: 'Деканат',
                ADMIN: 'Администратор',
            },
        },
    },
};

export default customMessages;
