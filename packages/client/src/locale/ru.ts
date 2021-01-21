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
        user: {
            name: 'Пользователь |||| Пользователи',
            fields: {
                login: 'Логин',
                name: 'Имя',
                last_name: 'Фамилия',
                second_name: 'Отчество',
                password: 'Пароль',
                personal_address: 'Адрес',
                personal_birthday: 'Дата рождения',
                personal_telephone: 'Телефон',
                role_id: 'Роль',
                photo_path: 'Фото профиля',
                registeration_date: 'Дата регистрации',
            },
        },
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
        teacher: {
            name: 'Преподаватель |||| Преподаватели',
            fields: {
                user_id: 'Пользователь',
                lessons: 'Дисциплины',
                experience: 'Стаж работы',
                lesson_name: 'Предмет',
            },
            page: {
                empty: 'Преподавателей еще нету',
                invite: 'Добавьте преподавателей',
            },
        },
        group: {
            name: 'Граппа |||| Группы',
            fields: {
                name: 'Название',
                date_formation: 'Дата формирования',
                specialty_id: 'Специальность',
            },
        },
        mark: {
            name: 'Отметка |||| Отметки',
            fields: {
                value: 'Значение',
                date: 'Дата выставления',
                student_id: 'Студент',
                schedule_id: 'Расписание',
            },
        },
        schedule: {
            name: 'Расисание |||| Расписания',
            fields: {
                date: 'Дата',
                time_start: 'Время начала',
                lesson_type: 'Тип',
                duration: 'Длительность',
                teacher_id: 'Преподваватель',
                lesson_id: 'Предмет',
                group_id: 'Группа',
                auditory_id: 'Аудитория',
            },
            type: {
                none: 'Не указано',
                lecture: 'Лекция',
                practice: 'Практика',
                lab: 'Лабораторная',
                other: 'Другое',
                exam: 'Экзамен',
            },
        },
        lesson: {
            name: 'Предмет |||| Предметы',
            fields: {
                name: 'Название',
            },
        },
        auditory: {
            name: 'Аудитория |||| Аудитории',
            fields: {
                name: 'Название',
                corpus: 'Корпус',
            },
        },
        specialty: {
            name: 'Специальность |||| Специальности',
            fields: {
                name: 'Название',
                kafedra_id: 'Кафедра',
            },
        },
        kafedra: {
            name: 'Кафедра |||| Кафедры',
            fields: {
                name: 'Название',
            },
        },
        teacher2lesson: {
            name: 'Дисциплина преп. |||| Дисциплины преп.',
            fields: {
                teacher_id: 'Преподваватель',
                lesson_id: 'Предмет',
            },
        },
        headman2group: {
            name: 'Староста |||| Старосты',
            fields: {
                student_id: 'Студент',
                group_id: 'Группа',
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
    csv: {
        buttonMain: {
            label: 'Импорт',
            tooltip: "Это должен быть файл с расширением '.csv' или '.tsv'.",
            emptyResource: "Свойство 'resource' было пустым, вы точно передали {...props} в ImportButton?",
        },
        parsing: {
            collidingIds: 'Обнаружены конфликтующие поля "id"',
            failedValidateRow: 'CSV не прошел требуемую валидацию',
            invalidCsv: 'Документ не может быть проанализирован как файл "csv"',
        },
        dialogCommon: {
            subtitle: 'Импорт %{count} элементов из %{fileName} в "%{resource}"',
            conflictCount:
                'Ресурс <strong>%{resource}</strong> имеет еще <strong>%{conflictingCount}</strong> записей с конфликтующими id',
            buttons: {
                cancel: 'Отмена',
            },
        },
        dialogImport: {
            alertClose: 'Импортирован %{fname}',
            title: 'Импортирование в "%{resource}"',
            buttons: {
                replaceAllConflicts: 'Заменить строки',
                skipAllConflicts: 'Пропустить эти строки',
                letmeDecide: 'Принять решение для каждой строки вручную',
            },
        },
        dialogDecide: {
            title: 'Импортирование id %{id} в "%{resource}"',
            buttons: {
                replaceRow: 'Заменить строку id=%{id}',
                addAsNewRow: 'Добавить как новую строку (не заменять)',
                skipDontReplace: 'Пропустить эту строку (не заменять)',
            },
        },
        loading: 'Загрузка...',
    },
};

export default customMessages;
