import { Aluno } from "./Aluno";
import { Disciplina } from "./Disciplina";
import { AlunoDisciplina } from "./AlunoDisciplina";
import { Turmas } from "./Turmas";
import { Cursos } from "./Cursos";
import { Professores } from "./Professores";
import { Notas } from "./Notas";
import { Presencas } from "./Presencas";

Aluno.belongsToMany(Disciplina, {
    through: AlunoDisciplina,
    foreignKey: "alunoId"
});

Disciplina.belongsToMany(Aluno, {
    through: AlunoDisciplina,
    foreignKey: "disciplinaId"
});

Cursos.hasMany(Turmas,   { foreignKey: "id_curso" });
Turmas.belongsTo(Cursos, { foreignKey: "id_curso" });

Turmas.hasMany(Aluno,    { foreignKey: "id_turma" });
Aluno.belongsTo(Turmas,  { foreignKey: "id_turma" });

Professores.hasMany(Disciplina,   { foreignKey: "id_professor" });
Disciplina.belongsTo(Professores,  { foreignKey: "id_professor" });

Aluno.hasMany(Notas,       { foreignKey: "alunoId" });
Notas.belongsTo(Aluno,      { foreignKey: "alunoId" });

Disciplina.hasMany(Notas,     { foreignKey: "disciplinaId" });
Notas.belongsTo(Disciplina,   { foreignKey: "disciplinaId" });

Aluno.hasMany(Presencas,    { foreignKey: "alunoId" });
Presencas.belongsTo(Aluno,  { foreignKey: "alunoId" });

Disciplina.hasMany(Presencas,   { foreignKey: "disciplinaId" });
Presencas.belongsTo(Disciplina, { foreignKey: "disciplinaId" });

console.log("✅ Relações entre models configuradas");