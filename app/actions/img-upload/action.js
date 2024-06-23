'use server'
 
// import { createClient } from '@supabase/supabase-js'
import { createClient } from '@/utils/supabase/server';

export async function create(prevState, formData) {
  // maybe?: https://github.com/orgs/supabase/discussions/4044


  // ...
  // console.log("formData", formData)
  // console.log("prevState", prevState)
  // const rawFormData = {
  //   make: formData.get('make'),
  //   model: formData.get('model'),
  //   // imgUrls: formData.get('imgUrls'),
  //   // primaryImgUrl: formData.get('primaryImgUrl')
  // }
  // console.log("rawFormData", rawFormData)
  const supabase = createClient()
  // const resp = await supabase.from("test_users_table").select();
  const resp = await supabase
  .from('test_users_table')
  .insert({ id: 1, email: 'test@gmail.com', age: 1, user_id: "6d77bb4f-6ed8-4d01-aa35-84003593665c"})




  console.log("user",await supabase.auth.getUser())
  console.log(resp)
  return resp


//   try {
//     // Mutate data
//   } catch (e) {
//     throw new Error('Failed to create task')
//   }
}