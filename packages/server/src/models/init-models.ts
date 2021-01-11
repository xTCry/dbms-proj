import type { Sequelize } from 'sequelize';
import { auditory } from './auditory';
import type { auditoryAttributes, auditoryCreationAttributes } from './auditory';
import { group } from './group';
import type { groupAttributes, groupCreationAttributes } from './group';
import { headman2group } from './headman2group';
import type { headman2groupAttributes, headman2groupCreationAttributes } from './headman2group';
import { kafedra } from './kafedra';
import type { kafedraAttributes, kafedraCreationAttributes } from './kafedra';
import { lesson } from './lesson';
import type { lessonAttributes, lessonCreationAttributes } from './lesson';
import { mark } from './mark';
import type { markAttributes, markCreationAttributes } from './mark';
import { mark_log } from './mark_log';
import type { mark_logAttributes, mark_logCreationAttributes } from './mark_log';
import { notify_schedule } from './notify_schedule';
import type { notify_scheduleAttributes, notify_scheduleCreationAttributes } from './notify_schedule';
import { role } from './role';
import type { roleAttributes, roleCreationAttributes } from './role';
import { schedule } from './schedule';
import type { scheduleAttributes, scheduleCreationAttributes } from './schedule';
import { specialty } from './specialty';
import type { specialtyAttributes, specialtyCreationAttributes } from './specialty';
import { student } from './student';
import type { studentAttributes, studentCreationAttributes } from './student';
import { teacher } from './teacher';
import type { teacherAttributes, teacherCreationAttributes } from './teacher';
import { teacher2lesson } from './teacher2lesson';
import type { teacher2lessonAttributes, teacher2lessonCreationAttributes } from './teacher2lesson';
import { user } from './user';
import type { userAttributes, userCreationAttributes } from './user';

export {
    auditory,
    group,
    headman2group,
    kafedra,
    lesson,
    mark,
    mark_log,
    notify_schedule,
    role,
    schedule,
    specialty,
    student,
    teacher,
    teacher2lesson,
    user,
};

export type {
    auditoryAttributes,
    auditoryCreationAttributes,
    groupAttributes,
    groupCreationAttributes,
    headman2groupAttributes,
    headman2groupCreationAttributes,
    kafedraAttributes,
    kafedraCreationAttributes,
    lessonAttributes,
    lessonCreationAttributes,
    markAttributes,
    markCreationAttributes,
    mark_logAttributes,
    mark_logCreationAttributes,
    notify_scheduleAttributes,
    notify_scheduleCreationAttributes,
    roleAttributes,
    roleCreationAttributes,
    scheduleAttributes,
    scheduleCreationAttributes,
    specialtyAttributes,
    specialtyCreationAttributes,
    studentAttributes,
    studentCreationAttributes,
    teacherAttributes,
    teacherCreationAttributes,
    teacher2lessonAttributes,
    teacher2lessonCreationAttributes,
    userAttributes,
    userCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
    auditory.initModel(sequelize);
    group.initModel(sequelize);
    headman2group.initModel(sequelize);
    kafedra.initModel(sequelize);
    lesson.initModel(sequelize);
    mark.initModel(sequelize);
    mark_log.initModel(sequelize);
    notify_schedule.initModel(sequelize);
    role.initModel(sequelize);
    schedule.initModel(sequelize);
    specialty.initModel(sequelize);
    student.initModel(sequelize);
    teacher.initModel(sequelize);
    teacher2lesson.initModel(sequelize);
    user.initModel(sequelize);

    group.belongsTo(specialty, { foreignKey: 'specialty_id' });
    specialty.hasMany(group, { foreignKey: 'specialty_id' });
    headman2group.belongsTo(group, { foreignKey: 'group_id' });
    group.hasMany(headman2group, { foreignKey: 'group_id' });
    headman2group.belongsTo(student, { foreignKey: 'student_id' });
    student.hasMany(headman2group, { foreignKey: 'student_id' });
    mark.belongsTo(schedule, { foreignKey: 'schedule_id' });
    schedule.hasMany(mark, { foreignKey: 'schedule_id' });
    mark.belongsTo(student, { foreignKey: 'student_id' });
    student.hasMany(mark, { foreignKey: 'student_id' });
    mark_log.belongsTo(mark, { foreignKey: 'mark_id' });
    mark.hasMany(mark_log, { foreignKey: 'mark_id' });
    notify_schedule.belongsTo(user, { foreignKey: 'peer_id' });
    user.hasMany(notify_schedule, { foreignKey: 'peer_id' });
    notify_schedule.belongsTo(schedule, { foreignKey: 'schedule_id' });
    schedule.hasMany(notify_schedule, { foreignKey: 'schedule_id' });
    notify_schedule.belongsTo(user, { foreignKey: 'sender_id' });
    user.hasMany(notify_schedule, { foreignKey: 'sender_id' });
    schedule.belongsTo(auditory, { foreignKey: 'auditory_id' });
    auditory.hasMany(schedule, { foreignKey: 'auditory_id' });
    schedule.belongsTo(group, { foreignKey: 'group_id' });
    group.hasMany(schedule, { foreignKey: 'group_id' });
    schedule.belongsTo(lesson, { foreignKey: 'lesson_id' });
    lesson.hasMany(schedule, { foreignKey: 'lesson_id' });
    schedule.belongsTo(teacher, { foreignKey: 'teacher_id' });
    teacher.hasMany(schedule, { foreignKey: 'teacher_id' });
    specialty.belongsTo(kafedra, { foreignKey: 'kafedra_id' });
    kafedra.hasMany(specialty, { foreignKey: 'kafedra_id' });
    student.belongsTo(group, { foreignKey: 'group_id' });
    group.hasMany(student, { foreignKey: 'group_id' });
    student.belongsTo(user, { foreignKey: 'user_id' });
    user.hasOne(student, { foreignKey: 'user_id' });
    teacher.belongsTo(user, { foreignKey: 'user_id' });
    user.hasOne(teacher, { foreignKey: 'user_id' });
    teacher2lesson.belongsTo(lesson, { foreignKey: 'lesson_id' });
    lesson.hasMany(teacher2lesson, { foreignKey: 'lesson_id' });
    teacher2lesson.belongsTo(teacher, { foreignKey: 'teacher_id' });
    teacher.hasMany(teacher2lesson, { foreignKey: 'teacher_id' });
    user.belongsTo(role, { foreignKey: 'role_id' });
    role.hasMany(user, { foreignKey: 'role_id' });

    return {
        auditory: auditory,
        group: group,
        headman2group: headman2group,
        kafedra: kafedra,
        lesson: lesson,
        mark: mark,
        mark_log: mark_log,
        notify_schedule: notify_schedule,
        role: role,
        schedule: schedule,
        specialty: specialty,
        student: student,
        teacher: teacher,
        teacher2lesson: teacher2lesson,
        user: user,
    };
}
