export interface CreateNewTask {
    name: string;
    slug: string;
    description: string;
    project_id: number | null;
    profile_id: string;
}
